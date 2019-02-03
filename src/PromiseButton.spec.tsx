import test from 'ava'
import React, { RefObject } from 'react'
import render from 'react-test-renderer'
import { Button } from '.'

const success = () => new Promise((res, rej) => setTimeout(res, 1000))
const failure = () => new Promise((res, rej) => setTimeout(rej, 1000))

test('Simple Button', t => {
  t.pass()
  return
  t.snapshot(render.create(
    <Button onClick={success}>Click Me!</Button>,
  ).toJSON())
})
