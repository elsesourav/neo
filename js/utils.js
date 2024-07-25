"use strict";

/* ----  local storage set and get ---- */
function setDataFromLocalStorage(key, object) {
   let data = JSON.stringify(object);
   localStorage.setItem(key, data);
}

function getDataFromLocalStorage(key) {
   return JSON.parse(localStorage.getItem(key));
}

const debounce = (func, delay = 1000) => {
   let debounceTimer;
   return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
   };
};

const isMobile =
   localStorage.mobile || "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// create element
const CE = (tagName, className = [], inrHtml = "", parent = null) => {
   const e = document.createElement(tagName);
   if (className) e.classList.add(...className);
   if (inrHtml) e.innerHTML = inrHtml;
   if (parent) parent.appendChild(e);
   return e;
};

function OBJECTtoJSON(data) {
   return JSON.stringify(data);
}

function JSONtoOBJECT(data) {
   return JSON.parse(data);
}

function safeEventListener(element, fun, ary = [], action = "click") {
   element.removeEventListener(action, element._fn);
   element._fn = () => {
      return fun(ary);
   };
   element.addEventListener(action, element._fn);
}

function copyArray(ary) {
   return JSON.parse(JSON.stringify(ary));
}

function pushStatus(name) {
   history.pushState({ name }, `${name}`, `./`);
}

function replaceState(name = "home") {
   history.replaceState({ name }, `${name}`, `./`);
}

function createConversationId() {
   return Date.now();
}
/**
 * @param {number} ms
 **/
function wait(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function splitHtmlIntoArray(html) {
   const array = [];
   let tagMatch;
   const tagRegex = /<\/?[\w\s="'-]+\/?>/g;
   let lastIndex = 0;

   while ((tagMatch = tagRegex.exec(html)) !== null) {
      const tag = tagMatch[0];
      const index = tagMatch.index;

      if (index > lastIndex) {
         array.push(html.slice(lastIndex, index));
      }
      array.push(tag);
      lastIndex = index + tag.length;
   }

   if (lastIndex < html.length) {
      array.push(html.slice(lastIndex));
   }

   return array.flatMap((item) => {
      if (/^[a-zA-Z0-9\s\.,!?()&;:]+$/.test(item)) {
         return Array.from(item);
      }
      return [item];
   });
}

async function typeHtml(element, html, delay = 10, fun = () => {}) {
   const array = splitHtmlIntoArray(html); 
   let content = "";
   fun();

   let i = 1;

   for (const item of array) {
      if (item.startsWith("<") && item.endsWith(">")) {
         content += item;
      } else {
         for (const char of item) {
            content += char;
            element.innerHTML = content;
            await wait(delay);

            // for scrolling
            if ((i++ % 30) == 0) {
               fun();
            }
         }
      }
      element.innerHTML = content;
   }
}
