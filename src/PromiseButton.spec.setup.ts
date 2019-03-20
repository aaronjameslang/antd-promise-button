import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
const g: any = global
g.window = window
g.document = window.document
g.navigator = { userAgent: 'node.js' }
