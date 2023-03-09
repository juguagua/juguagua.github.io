(() => {
  // ns-params:@params
  var params_default = { analytics: null, archive: { dateformat: "01-02" }, baseURL: "/", brand: "HBS", breadcrumb: true, codeblock: { linenos: false }, color: "auto", contact: { endpoint: "https://getform.io/f/56041c81-9e03-4c24-b9c5-61238854d4cd" }, counttaxonomyposts: true, creativecommons: null, customcss: null, customjs: null, dateformat: "2006-01-02", description: "\u4E00\u4E2A\u5FEB\u901F\u3001\u54CD\u5E94\u5F0F\u548C\u529F\u80FD\u4E30\u5BCC\u7684 Hugo \u535A\u5BA2\u4E3B\u9898", diagram: false, featuredpostcount: 5, fixedheader: true, fontsize: null, fullwidth: false, googleadsense: null, hascjklanguage: true, keywords: "Hugo, Bootstrap, \u535A\u5BA2\u4E3B\u9898", languagename: "\u7B80\u4F53\u4E2D\u6587", mainsections: ["blog", "posts", "news"], palette: "purple", palettes: ["blue", "blue gray", "brown", "cyan", "green", "indigo", "orange", "pink", "purple", "red", "teal", "yellow"], params: { archive: { dateformat: "01-02" }, dateformat: "2006-01-02", description: "\u4E00\u4E2A\u5FEB\u901F\u3001\u54CD\u5E94\u5F0F\u548C\u529F\u80FD\u4E30\u5BCC\u7684 Hugo \u535A\u5BA2\u4E3B\u9898", keywords: "Hugo, Bootstrap, \u535A\u5BA2\u4E3B\u9898" }, pinnedpost: true, pinnedpostcount: 3, post: { featuredimage: true, numberifyheadings: true, numberifyheadingsseparator: "." }, postdate: true, poweredby: true, pwa: { manifest: { short_name: "HBS" } }, readingtime: true, recentpostcount: 5, relatedpostcount: 5, repo: { branch: "main", url: "https://github.com/razonyang/hugo-theme-bootstrap-skeleton" }, reward: { alipay: "images/reward/alipay.png", wechat: "images/reward/wechat.png" }, search: { fuse: { threshold: 0.1 }, paginate: 5 }, searchbar: true, sidebar: null, sidebartaxonomies: ["series", "categories", "tags", "authors"], siteverification: { baidu: null, baiduunion: null, bing: null, google: null, shenma: null, so: null, sogou: null }, taxonomypaginate: 10, taxonomypostcount: 20, title: "HBS \u811A\u624B\u67B6", titlecase: true, titleseparator: "-", tocwordcount: 1, topappbar: { social: { github: "razonyang/hugo-theme-bootstrap", patreon: "razonyang", paypal: "razonyang" } }, utterances: { label: "comment", repo: "razonyang/hugo-theme-bootstrap-skeleton" }, viewer: true, weight: 4 };

  // ns-hugo:D:\GitHub\Blog\themes\hugo-theme-bootstrap\assets\js\local-storage\index.ts
  var PathLocalStorage = class {
    constructor(baseURL) {
      this.baseURL = baseURL;
      this.prefix = "hbs:";
      if (baseURL.substring(0, 2) === "//") {
        baseURL = "http:" + baseURL;
      }
      let url;
      try {
        url = new URL(baseURL);
      } catch (e) {
        url = new URL(baseURL, location.protocol + "//" + location.host);
      }
      const pathname = url.pathname.replace(/^(\/+)/, "").replace(/(\/+)$/, "");
      if (pathname !== "") {
        this.prefix += pathname.replace("/", "-") + ":";
      }
    }
    getItem(key) {
      return localStorage.getItem(this.prefix + key);
    }
    setItem(key, value) {
      localStorage.setItem(this.prefix + key, value);
    }
    removeItem(key) {
      localStorage.removeItem(this.prefix + key);
    }
  };
  var local_storage_default = new PathLocalStorage(params_default.baseURL);

  // ns-hugo:D:\GitHub\Blog\themes\hugo-theme-bootstrap\assets\js\mode\index.ts
  var MODE_AUTO = "auto";
  var MODE_DARK = "dark";
  var MODE_LIGHT = "light";
  var modes = [MODE_AUTO, MODE_DARK, MODE_LIGHT];
  var ModeToggle = class {
    constructor() {
      // Cache key.
      this.key = "mode";
      let mode = local_storage_default.getItem(this.key);
      if (!mode) {
        mode = params_default.color;
      }
      this.mode = modes.includes(mode) ? mode : MODE_AUTO;
    }
    run() {
      this.setMode(this.mode);
      window.addEventListener("load", () => {
        this.initListeners();
        this.active(this.mode);
      });
    }
    initListeners() {
      this.items = document.querySelectorAll(".mode-item");
      this.items.forEach((ele) => {
        ele.addEventListener("click", () => {
          const mode = ele.getAttribute("data-color-mode");
          this.setMode(mode);
          this.active(mode);
        });
      });
      window.matchMedia("(prefers-color-scheme: dark)").addListener((e) => {
        if (this.isAuto()) {
          this.setMode(e.matches ? "dark" : "light");
        }
      });
    }
    isAuto() {
      return this.mode === MODE_AUTO;
    }
    // Active the relative HTML elements.
    active(mode) {
      var _a, _b;
      this.mode = mode;
      local_storage_default.setItem(this.key, mode);
      this.items.forEach((ele) => {
        const classList = ele.querySelector(".dropdown-item").classList;
        if (ele.getAttribute("data-color-mode") === mode) {
          classList.add("active");
        } else {
          classList.remove("active");
        }
      });
      const icon = (_a = document.querySelector('.mode-item[data-color-mode="' + mode + '"] .mode-icon')) == null ? void 0 : _a.cloneNode(true);
      if (!icon) {
        return;
      }
      icon.setAttribute("id", "modeIcon");
      (_b = document.querySelector("#modeIcon")) == null ? void 0 : _b.replaceWith(icon);
    }
    setMode(value) {
      if (value === "auto") {
        value = ModeToggle.getPreferredMode();
      }
      console.debug(`Switch to ${value} mode`);
      document.documentElement.setAttribute("data-bs-theme", value);
      const event = new CustomEvent("hbs:mode", { detail: { mode: value } });
      document.dispatchEvent(event);
    }
    static getPreferredMode() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
      return "light";
    }
  };
  var mode_default = ModeToggle;

  // ns-hugo:D:\GitHub\Blog\themes\hugo-theme-bootstrap\assets\js\palettes\index.ts
  var PaletteSelector = class {
    constructor() {
      this.key = "palette";
    }
    run() {
      const palette = this.getPalette();
      if (palette) {
        this.setPalette(palette);
      }
      window.addEventListener("load", () => {
        this.initPalette();
      });
    }
    initPalette() {
      const selected = this.getPalette();
      document.querySelectorAll(".palette").forEach((element) => {
        const paletteId = element.getAttribute("id").replace("palette-", "");
        if (paletteId === selected) {
          element.classList.add("active");
        }
        element.addEventListener("click", () => {
          this.setPalette(paletteId);
          document.querySelector(".palette.active").classList.remove("active");
          element.classList.add("active");
        });
      });
    }
    getPalette() {
      const palette = local_storage_default.getItem(this.key);
      if (palette) {
        return palette;
      }
      const paletteMeta = document.documentElement.getAttribute("data-palette");
      if (paletteMeta) {
        return paletteMeta;
      }
      return "";
    }
    setPalette(palette) {
      console.debug(`switch to palette: ${palette}`);
      document.documentElement.setAttribute("data-palette", palette);
      local_storage_default.setItem(this.key, palette);
    }
  };
  var palettes_default = PaletteSelector;

  // <stdin>
  new mode_default().run();
  new palettes_default().run();
})();
