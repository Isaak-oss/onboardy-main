export const interactiveScript = `
  let viewMode = true;

    function getRectBySelector(selector) {
      const element = document.querySelector(selector);
      if (!element) return null;

      const rect = element.getBoundingClientRect();
      return {
        xScroll: rect.left + window.scrollX,
        yScroll: rect.top + window.scrollY,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }

    window.addEventListener("message", (event) => {
      if (event.data.type === "getRect" && event.data.selector) {
        const rect = getRectBySelector(event.data.selector);
        event.source.postMessage(
                { type: "rectResponse", element: { rect, cssSelector: event.data.selector, url: location.href } },
                '*'
        );
        const element = document.querySelector(event.data.selector);
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        createHighlightBlock(element)
      }
      if (event.data.type === "viewMode") {
        viewMode = event.data.viewMode;
        console.log("viewMode updated:", viewMode);
      }
      if (event.data.type === "deleteHighlight") {
        deleteAllHighlightBlocks()
      }
    });

    function getUniqueSelector(el) {
      const path = [];
      while (el.parentElement) {
        let tag = el.tagName.toLowerCase();

        if (el.id) {
          path.unshift(\`\${tag}#\${el.id}\`);
          break;
        }

        let siblings = [...el.parentElement.children].filter(e => e.tagName === el.tagName);
        if (siblings.length > 1) {
          let index = siblings.indexOf(el) + 1;
          tag += \`:nth-of-type(\${index})\`;
        }

        path.unshift(tag);
        el = el.parentElement;
      }
      return path.join(" > ");
    }

    function deleteAllHighlightBlocks() {
      const highlightBlocks = document.querySelectorAll("[data-id='highlightBlockForTooltipMaster']")

      highlightBlocks.forEach(item => {
        document.body.removeChild(item)
      })
    }

    function createHighlightBlock(element) {
      if (!element) {
        deleteAllHighlightBlocks()
        return
      }
      const rect = element.getBoundingClientRect();
      deleteAllHighlightBlocks()

      const highlightBlock = document.createElement('div')
      highlightBlock.dataset.id = "highlightBlockForTooltipMaster"
      Object.assign(highlightBlock.style, {
        position: "absolute",
        top: rect.top + window.scrollY + "px",
        left: rect.left + window.scrollX + "px",
        width: rect.width + "px",
        height: rect.height + "px",
        border: "2px solid blue",
        background: "rgba(0, 0, 255, 0.1)",
        pointerEvents: "none",
        zIndex: 9999,
      });

      document.body.appendChild(highlightBlock);

      function updateHighlightPosition() {
        const newRect = element.getBoundingClientRect();
        highlightBlock.style.top = newRect.top + window.scrollY + "px";
        highlightBlock.style.left = newRect.left + window.scrollX + "px";
        highlightBlock.style.width = newRect.width + "px";
        highlightBlock.style.height = newRect.height + "px";
      }

      window.addEventListener("resize", updateHighlightPosition);
    }

    document.addEventListener('click', (event) => {
      const isInIframe = window.self !== window.top;
      if (isInIframe && !viewMode) {
        const clickedElement = event.target;
        const cssSelector = getUniqueSelector(clickedElement)
        const rect = clickedElement.getBoundingClientRect();
        window.parent.postMessage(
                {
                  type: 'rectResponse',
                  element: {
                    tagName: clickedElement.tagName,
                    rect: {
                      xScroll: rect.left + window.scrollX,
                      yScroll: rect.top + window.scrollY,
                      x: rect.left,
                      y: rect.top,
                      width: rect.width,
                      height: rect.height,
                    },
                    scrollHeight: document.body.scrollHeight,
                    outerHTML: clickedElement.outerHTML,
                    cssSelector,
                  },
                  url: location.href
                },
                '*'
        );
        createHighlightBlock(clickedElement)
      }
    });
`;

export const connectTooltipsToUserScript = (projectId: string, apiKey: string, apiUrl: string) => `
  let currentIndex = localStorage.getItem("tooltipIndex") || 0;
  let currentTooltip = null;

  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  function enableScroll() {
    document.body.style.overflow = '';
  }

  function createTooltip(data, totalCount) {
    const cssSelectorElement = document.querySelector(data?.cssSelector)
    
    if (!cssSelectorElement) {
      return
    }
    
    const cssSelectorElementRect = cssSelectorElement.getBoundingClientRect();

    const tooltipWrap = document.createElement('div');
    Object.assign(tooltipWrap.style, {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 999,
      height: document.body.scrollHeight + "px"
    });

    const tooltipContainer = document.createElement('div');
    Object.assign(tooltipContainer.style, {
      backgroundColor: '#fff',
      position: 'absolute',
      top: \`\${cssSelectorElementRect.top + window.scrollY + cssSelectorElement.scrollHeight + 10}px\`,
      left: \`\${cssSelectorElementRect.left + 10}px\`,
      zIndex: 999,
      borderRadius: '0.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      minWidth: "200px",
      maxWidth: "300px",
      padding: '0.75rem',
      ...data?.containerStyles
    });

    const tooltipText = document.createElement('div');
    tooltipText.textContent = data.text;
    Object.assign(tooltipContainer.style, {
      fontSize: "20px",
      ...data?.textStyles
    });
    tooltipContainer.appendChild(tooltipText);

    const button = document.createElement('button');
    button.textContent = data.btnText;
    Object.assign(button.style, {
      display: 'flex',
      color: "#fff",
      fontSize: "0.8rem",
      padding: "0.37rem 0.75rem",
      backgroundColor: "rgb(79, 70, 229)",
      borderRadius: '0.375rem',
      width: '50%',
      justifyContent: "center",
      cursor: "poiner",
      border: "none",
      ...data?.btnStyles
    });

    const skipButton = document.createElement('button');
    skipButton.textContent = data.skipBtnText;
    Object.assign(skipButton.style, {
      display: 'flex',
      color: "#fff",
      fontSize: "0.8rem",
      padding: "0.37rem 0.75rem",
      backgroundColor: "rgb(79, 70, 229)",
      borderRadius: '0.375rem',
      width: '50%',
      justifyContent: "center",
      cursor: "poiner",
      border: "none",
      ...data?.skipBtnStyles
    });

    const stages = document.createElement('div');
    stages.textContent = \`stage \${data.index + 1} of \${totalCount}\`;
    Object.assign(skipButton.style, {
      color: "#fff",
      fontSize: "0.8rem",
      ...data?.stagesStyle
    });

    button.addEventListener('click', () => {
      document.body.removeChild(tooltipWrap);
      enableScroll();
      currentTooltip = null;
      localStorage.setItem("tooltipIndex", currentIndex);
      showNextTooltip(data?.withRedirect);
    });

    skipButton.addEventListener('click', () => {
      document.body.removeChild(tooltipWrap);
      enableScroll();
      currentTooltip = null;

      skipAll();
    });

    tooltipContainer.appendChild(button);
    tooltipContainer.appendChild(skipButton);
    data?.withStages && tooltipContainer.appendChild(stages);
    tooltipWrap.appendChild(tooltipContainer);

    document.body.appendChild(tooltipWrap);

    window.scrollTo({
      top: cssSelectorElementRect.top + window.scrollY - cssSelectorElement.scrollHeight - 50,
      behavior: 'smooth',
    });

    return tooltipWrap;
  }

  let data

  async function showNextTooltip(withRedirect) {
    if (!data) {
      console.warn("Data is not loaded yet!");
      return;
    }
    try {
      // check for my domain
      window.top.location.href
      if (currentIndex < data.length) {
        const tooltip = data[currentIndex];
        let tooltipUrl = tooltip.url.endsWith('/') ? tooltip.url : tooltip.url + '/';
        if (tooltipUrl !== document.location.href && withRedirect) {
          window.location.replace(tooltip.url);
        } else if (tooltipUrl === document.location.href) {
          currentTooltip = createTooltip(tooltip, data.length);
          disableScroll();
          currentIndex++
        }
      } else {
        console.log("All Tooltips are shown");
      }
    } catch (err) {
      console.log("Cannot show tooltip on other domain");
    }
  }

  async function skipAll() {
    currentIndex = data.length - 1
    localStorage.setItem("tooltipIndex", data.length - 1);
  }

  async function getData() {
    const url = \`${apiUrl}tooltips/${projectId}\`;
  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": \`ApiKey ${apiKey}\`,
      }
    });
    if (!response.ok) {
      throw new Error(\`Response status: \${response.status}\`);
    }

    const json = await response.json();
    data = json.sort((a,b) => a.index - b.index)
  } catch (error) {
    console.error(error.message);
  }
}

(async function startTooltips() {
  await getData();
  setTimeout(() => {
    showNextTooltip()
  }, 1000)
})();

// check need to show tooltip if it\`s first time visiting url
    (function () {
      let lastUrl = location.href;

      const isInIframe = window.self !== window.top;

      function shouldBlockRedirects() {
        return isInIframe && !viewMode;
      }

      function notifyParentAboutUrlChange() {
        window.parent.postMessage({ type: "urlChange", url: location.href }, "*");
      }

      function blockRedirects() {
        console.warn("Редиректы запрещены внутри iframe на этом домене");

        history.pushState = function () {};
        history.replaceState = function () {};

        // Блокируем popstate
        window.addEventListener("popstate", () => {
          history.go(1);
        });
      }

      if (shouldBlockRedirects()) {
        blockRedirects();
        return;
      }

      new MutationObserver(() => {
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          notifyParentAboutUrlChange()
        }
      }).observe(document, { subtree: true, childList: true });

      const pushState = history.pushState;
      history.pushState = function () {
        if (shouldBlockRedirects()) return;
        pushState.apply(this, arguments);
        window.dispatchEvent(new Event("pushstate"));
        window.dispatchEvent(new Event("locationchange"));
        notifyParentAboutUrlChange();
      };

      const replaceState = history.replaceState;
      history.replaceState = function () {
        if (shouldBlockRedirects()) return;
        replaceState.apply(this, arguments);
        window.dispatchEvent(new Event("replacestate"));
        window.dispatchEvent(new Event("locationchange"));
        notifyParentAboutUrlChange();
      };

      window.addEventListener("popstate", () => {
        if (shouldBlockRedirects()) {
          history.go(1);
          return;
        }
        window.dispatchEvent(new Event("locationchange"));
        notifyParentAboutUrlChange();
      });

      window.addEventListener("locationchange", () => {
        notifyParentAboutUrlChange();
        if (location.href !== lastUrl) {
          lastUrl = location.href;
          showNextTooltip();
        }
      });
    })();

`;

export const defaultStylesExample = `backgroundColor: "#000";
color: "#fff";
fontSize: "16px";
`;

export const tokenName = "tooltipMasterAuthToken"
export const isAuthName = "tooltipMasterIsAuth"
