import { action } from '@storybook/addon-actions'
import {
  boolean,
  color,
  number,
  select,
  text,
} from '@storybook/addon-knobs/react'
import { storiesOf } from '@storybook/react'
import 'antd/lib/button/style/css'
import Form from 'antd/lib/form'
import 'antd/lib/form/style/css'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css'
import React from 'react'
import { Button } from '.'

// tslint:disable:max-classes-per-file

storiesOf('Promise Button', module)
  .add('Backwards Compatible', () => {
    const onClick = () => action('clicked')()
    return <Button onClick={onClick}>Click Me!</Button>
  }, {
    notes: 'If your onClick handler doesn\'t return a promise, the button will behave like an ordinary button',
  })
  .add('Simple', () => {
    const onClick = () => new Promise(res => setTimeout(res, 1000))
    return <Button onClick={onClick}>Click Me!</Button>
  }, {
    notes: 'The only requirement is that your onClick returns a promise. We\'ll do the rest!',
  })
  .add('Login Form', () => {
    const actionButtonClicked = action('button clicked')
    let password = 'changeme'
    const login = (event: React.MouseEvent<HTMLButtonElement>) => new Promise((res, rej) => {
      actionButtonClicked(event)
      setTimeout(() => {
        if (password === 'changeme') {
          action('login approved')(password)
          res()
        } else {
          action('login rejected')(password)
          rej()
        }
      }, 1000)
    })
    return (
      <div style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '32em',
      }}>
        <Form.Item label='Username' >
          <Input
            defaultValue='alice'
            type='text'
          />
        </Form.Item>
        <Form.Item label='Password' >
          <Input
            defaultValue={password}
            type='password'
            onChange={event => {
              action('password changed')(event)
              password = (event.target as { value: string}).value
            }}
          />
        </Form.Item>
        <Button
          style={{ marginTop: '1em', minWidth: '10em' }}
          type='primary'
          onClick={login}
          labels={{
            [Button.FULFILLED]: 'Logged In',
            [Button.INITIALISED]: 'Log In',
            [Button.PENDING]: 'Logging In',
            [Button.REJECTED]: 'Log In Failed',
          }}
        />
        <Button
          style={{ marginTop: '1em', minWidth: '10em' }}
          // type='default'
          onClick={login}
          labels={{
            [Button.FULFILLED]: 'Signed Up',
            [Button.INITIALISED]: 'Sign Up',
            [Button.PENDING]: 'Signing Up',
            [Button.REJECTED]: 'Sign Up Failed',
          }}
        />
      </div>
    )
  }, {
    notes: { markdown: `
Promise buttons can be used to make many interfaces feel more responsive.

When the user clicks the button, a loading spinner is shown and the button is disabled.
This feedback assures the user that their action is being processed,
and prevents accidental double-logins and other bugs.

The expected password is "changeme".

If the password is correct, the button turns green and shows a successful message.
This makes the page feel more responsive while the user waits for the
page redirection or other slow process to complete.

If the password is incorrect, the button will turn red and show an error message.
Try changing the password.
`},
  })
  .add('Variety', () => {
    let clicks = 0
    const onClick = () =>
      new Promise((res, rej) => {
        clicks += 1
        setTimeout(() => clicks % 2 ? res() : rej(), 1000)
      })
    class Row extends React.Component<any> {
      public render () {
        return <div style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: '1em',
          width: '100%',
          ...this.props.style,
        }} {...this.props}/>
      }
    }
    class Col extends React.Component {
      public render () {
        return <div style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-around',
        }} {...this.props}/>
      }
    }
    return (
      <Col>
        <Row>
        <Button type='primary' size='large' onClick={onClick}>Primary</Button>
        <Button size='large' onClick={onClick}>Normal</Button>
        <Button type='dashed' size='large' onClick={onClick}>Dashed</Button>
        <Button type='danger' size='large' onClick={onClick}>Danger</Button>
        </Row><Row>
        <Button type='primary' onClick={onClick}>Primary</Button>
        <Button onClick={onClick}>Default</Button>
        <Button type='dashed' onClick={onClick}>Dashed</Button>
        <Button type='danger' onClick={onClick}>Danger</Button>
      </Row><Row>
        <Button type='primary' size='small' onClick={onClick}>Primary</Button>
        <Button size='small' onClick={onClick}>Normal</Button>
        <Button type='dashed' size='small' onClick={onClick}>Dashed</Button>
        <Button type='danger' size='small' onClick={onClick}>Danger</Button>
      </Row><Row>
        <Button type='primary' disabled onClick={onClick}>Primary</Button>
        <Button disabled onClick={onClick}>Default</Button>
        <Button type='dashed' disabled onClick={onClick}>Dashed</Button>
        <Button type='danger' disabled onClick={onClick}>Danger</Button>
      </Row><Row>
        <Button type='primary' shape='circle' icon='search' onClick={onClick}/>
        <Button type='primary' icon='search' onClick={onClick}>Search</Button>
        <Button shape='circle' icon='search' onClick={onClick}/>
        <Button icon='search' onClick={onClick}>Search</Button>
        <Button type='dashed' shape='circle' icon='search' onClick={onClick}/>
        <Button type='dashed' icon='search' onClick={onClick}>Search</Button>
      </Row><Row>
        <Button type='primary' shape='circle' icon='download' onClick={onClick}/>
        <Button type='primary' shape='round' icon='download' onClick={onClick}>Download</Button>
        <Button type='primary' icon='download' onClick={onClick}>Download</Button>
      </Row><Row>
        <Button.Group>
        <Button type='primary' onClick={onClick}>
        <Icon type='left' />Backward
        </Button>
        <Button type='primary' onClick={onClick}>
        Forward<Icon type='right' />
        </Button>
        </Button.Group>
      </Row><Row style={{ background: 'rgb(190, 200, 200)' }}>
          <Button type='primary' ghost onClick={onClick}>Primary</Button>
          <Button ghost onClick={onClick}>Default</Button>
          <Button type='dashed' ghost onClick={onClick}>Dashed</Button>
          <Button type='danger' ghost onClick={onClick}>danger</Button>
      </Row>
      </Col>
    )
  }, {
    notes: { markdown: `
Promise buttons can be configured in all the normal ways you'd expect
from [antd](https://ant.design/components/button/).
`},
  })
  .add('Custom', () => {
    const succeed = boolean('Succeed', true, 'Promise')
    const type = select('Type', ['primary', 'default', 'dashed', 'danger'], 'primary', 'Original')
    const timeout = number('Reset Timeout', 2000, {}, 'Promise')
    const colors = {
      [Button.FULFILLED]: color('Color Fulfilled', '#52c41a', 'Promise'),
      [Button.REJECTED]: color('Color Rejected', '#f5222d', 'Promise'),
    }
    const labels = {
      [Button.FULFILLED]: text('Label Fulfilled', 'Submitted', 'Labels'),
      [Button.INITIALISED]: text('Label Initialised', 'Submit', 'Labels'),
      [Button.PENDING]: text('Label Pending', 'Submitting', 'Labels'),
      [Button.REJECTED]: text('Label Rejected', 'Not Submitted', 'Labels'),
    }
    return (
      <Button
        colors={colors}
        labels={labels}
        timeout={timeout}
        type={type}
        onClick={() => new Promise((res, rej) => {
          setTimeout(() => { succeed ? res() : rej() }, 1000)
        })}
      />

    )
  })
