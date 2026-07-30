const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {
  // 复制静态资源
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/scripts");

  // Favicon、图标和 PWA assets
  eleventyConfig.addPassthroughCopy("src/*.{png,ico,json}");
  eleventyConfig.addPassthroughCopy("src/og-image.png");

  // 复制 Prism.js 资源
  eleventyConfig.addPassthroughCopy({
    "node_modules/prismjs/themes/prism-solarizedlight.css": "prism-light.css",
    "node_modules/prismjs/themes/prism-tomorrow.css": "prism-dark.css",
    "node_modules/prismjs/prism.js": "prism.js",
    "node_modules/prismjs/components/prism-jsx.min.js": "prism-jsx.js",
    "node_modules/prismjs/components/prism-typescript.min.js": "prism-typescript.js",
    "node_modules/prismjs/components/prism-tsx.min.js": "prism-tsx.js",
    "node_modules/prismjs/components/prism-bash.min.js": "prism-bash.js",
    "node_modules/prismjs/components/prism-json.min.js": "prism-json.js",
  });

  // 为 Markdown 标题自动添加 id
  eleventyConfig.amendLibrary("md", (md) =>
    md.use(markdownItAnchor, {
      level: [2, 3, 4],
      permalink: false,
      slugify: (text) => {
        // 保留中文、英文、数字和连字符
        return text
          .toString()
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9一-龥-]/g, "");
      },
    })
  );

  // 按标签筛选文章
  eleventyConfig.addFilter("selectByTag", (posts, tagName) => {
    if (!tagName) return posts;
    return posts.filter(post => {
      const tags = post.data.tags || [];
      return tags.includes(tagName);
    });
  });

  // 最新 3 篇文章（用于首页，排除标签页等非文章页面）
  eleventyConfig.addCollection("latestPosts", (collectionApi) => {
    return collectionApi.getFilteredByTag("posts")
      .filter(item => item.inputPath.endsWith('.md'))
      .reverse()
      .slice(0, 3);
  });

  // 收集所有标签及文章数
  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("posts");
    const tagMap = new Map();
    for (const post of posts) {
      const tags = post.data.tags || [];
      for (const tag of tags) {
        // 跳过非字符串标签和 posts 自身标签
        if (typeof tag !== "string" || tag === "posts") continue;
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    }
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  });

  // 日期格式化过滤器
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  // 日期简写过滤器（用于卡片）
  eleventyConfig.addFilter("shortDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  });

  // ISO 日期格式（用于 <time datetime>）
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toISOString().split("T")[0];
  });

  // 截取摘要
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return "";
    return content.split("\n").slice(0, 2).join(" ").replace(/<[^>]+>/g, "").slice(0, 140) + "……";
  });

  // 从渲染后的内容中提取标题，自动生成大纲
  eleventyConfig.addFilter("outline", (content) => {
    const headingRegex = /<h([2-4])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-4]>/g;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: parseInt(match[1], 10),
        id: match[2],
        text: match[3].replace(/<[^>]+>/g, "").trim(),
      });
    }

    if (headings.length === 0) return "";

    function buildTree(items) {
      const root = { level: 0, children: [] };
      const stack = [root];

      for (const item of items) {
        const node = { ...item, children: [] };

        while (stack.length > 1 && stack[stack.length - 1].level >= item.level) {
          stack.pop();
        }

        stack[stack.length - 1].children.push(node);
        stack.push(node);
      }

      return root.children;
    }

    function renderTree(nodes, isRoot = true) {
      if (nodes.length === 0) return "";

      const ulClass = isRoot ? "outline-list" : "outline-children";
      let html = `<ul class="${ulClass}">`;

      for (const node of nodes) {
        html += `<li class="outline-item"><a href="#${node.id}" class="outline-row"><span class="outline-title">${node.text}</span></a>`;
        if (node.children.length > 0) {
          html += renderTree(node.children, false);
        }
        html += "</li>";
      }

      html += "</ul>";
      return html;
    }

    const tree = buildTree(headings);
    const html = renderTree(tree);
    return `<div class="outline-box">目录</div>\n${html}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
