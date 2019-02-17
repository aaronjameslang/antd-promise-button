import test from 'ava'
import React from 'react'
import render from 'react-test-renderer'
import { Button } from '.'

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

test('Simple Button', t => {
  t.snapshot(render.create(
    <Button onClick={success}>Click Me!</Button>,
  ).toJSON())
})
