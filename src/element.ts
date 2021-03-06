import {propTypes} from "./types"

const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i

const setAccessor = (node: HTMLElement, name: string, value: any) => {
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

const flatArry = (params: any[]): any[] => {
  if(!params) return []
  return params.reduce((prev, curr) => {
    if(curr instanceof Array) 
      return [...prev, ...flatArry(curr)]
    return [...prev, curr]
  }, [])
}

export const createElement = (tag: string, props: propTypes, ...children: (string | HTMLElement)[]): HTMLElement => {
  const element = document.createElement(tag)
  if(props != null) Object.keys(props).map(key => setAccessor(element, key, props[key]))
  if(children != null) {
    children = flatArry(children)
    children.forEach(node => {
      if(typeof node === 'string') {
        element.appendChild(document.createTextNode(node))
      } else {
        element.appendChild(node)
      }
    })
  }
  element.normalize()
  return element
}