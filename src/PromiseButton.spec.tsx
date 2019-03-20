import test from 'ava'
import { configure, mount, shallow } from 'enzyme'
// Setup first ^
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import render from 'react-test-renderer'
import { Button } from '.'
import './PromiseButton.spec.setup'

configure({ adapter: new Adapter() })

const delay = <T extends any> (x?: T, y?: Error) =>
  new Promise((res, rej) => setTimeout(
    () => {
      if (y) rej(y)
      else res(x)
    },
    100,
  ))

const success = () => new Promise((res, rej) => setTimeout(res, 1000))
const failure = () => new Promise((res, rej) => setTimeout(rej, 1000))

test('Backwards Compatible Button', t => {
  t.snapshot(render.create(
    <Button onClick={() => undefined}>Click Me!</Button>,
  ).toJSON())
})

test('BC Button can\t have extra props', t => {
  // t.snapshot(render.create(
  //   <Button onClick={() => undefined} timeout={100}>Click Me!</Button>,
  // ).toJSON())
  // Doesn't compile ^
  t.pass()
})

test('Simple Button, render', t => {
  t.snapshot(render.create(
    <Button onClick={success}>Click Me!</Button>,
  ).toJSON())
})

test('Simple Button, click', async t => {
  const wrapper = mount(
    <Button onClick={() => delay()}/>,
  )
  t.snapshot(wrapper.render())
  wrapper.find('button').simulate('click')
  t.snapshot(wrapper.render())
  t.pass()
})
