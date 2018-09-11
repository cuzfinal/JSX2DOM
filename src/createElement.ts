import {attrTypes} from "./typs"

const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

export const createElement = (tag: string, attrs?: attrTypes[], children?: any[], recursive?: boolean) => {
  if(tag === 'text') return document.createTextNode('text')
  const element = document.createElement(tag)
  Object.keys(attrs).map(key => setAccessor(element, key, attrs[key]))
  children.forEach(node => element.appendChild(createElement(node.tag, node.attrs, node.children, true)))
  !recursive && element.normalize()
  return element
}

export const setAccessor = (node: HTMLElement, name: string, value: any) => {
  if (name === 'className') name = 'class'

  else if (name === 'class') {
    node.className = value || ''
  }
  else if (name === 'style') {
    if (!value || typeof value === 'string') {
      node.style.cssText = value || ''
    }
    if (value && typeof value === 'object') {
      for (let i in value) {
        node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + 'px') : value[i]
      }
    }
  }
  else if (name[0] == 'o' && name[1] == 'n') {
    let useCapture = name !== (name = name.replace(/Capture$/, ''))
    name = name.toLowerCase().substring(2)
    if (value) {
      node.addEventListener(name, value, useCapture)
    }
  }
  else {
    try {
      node[name] = value == null ? '' : value
    } catch (e) { }
    if (value == null || value === false) node.removeAttribute(name)
  }
}