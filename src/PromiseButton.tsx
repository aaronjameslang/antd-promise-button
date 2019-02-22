import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { Status } from './Status'

/**
 * If onClick returns void, the button is in BC mode,
 *   and you cannot specify other props.
 */
export type Props<T> = {
  colors: T extends void ? undefined : Colors,
  labels?: T extends void ? undefined : Labels,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => T,
  timeout: T extends void ? undefined : number,
} & ButtonProps

export interface Labels {
  FULFILLED: string,
  INITIALISED: string,
  PENDING: string,
  REJECTED: string,
}

export interface Colors {
  [key: string /*TODO FinalStatus*/ ]: string,
  FULFILLED: string,
  REJECTED: string,
}

export interface State {
  status: Status,
}

/**
 * T here is the return type of the onClick prop
 * Either a Promise for 'smart' functionality
 *   or void for backwards compatibility
 */
export class PromiseButton<T = Promise<unknown> | void> extends React.Component<Props<T>, State> {

  public static readonly FULFILLED = Status.FULFILLED
  public static readonly INITIALISED = Status.INITIALISED
  public static readonly PENDING = Status.PENDING
  public static readonly REJECTED = Status.REJECTED

  public static readonly Group = Button.Group

  public static readonly defaultProps = {
    colors: {
      [Status.FULFILLED]: '#52c41a',
      [Status.REJECTED]: '#f5222d',
    },
    timeout: 2000,
  }

  constructor (props: Props<T>) {
    super(props)
    this.state = { status: Status.INITIALISED }
  }

  public render () {
    const {
      ...props
    } = this.props
    return (
      <Button
        {...props}
        loading={this.isLoading()}
        onClick={(e: any) => this.onClick(e)}
        style={this.getStyle()}
      >{this.getLabel()}</Button>
    )
  }

  private enqueueReset () {
    setTimeout(() => this.setStatus(Status.INITIALISED), this.props.timeout)
  }

  private getLabel () {
    return this.props.labels ?
      this.props.labels[this.state.status] :
      this.props.children
  }

  private getStyle () {
    if (!this.isFinalised() || !this.props.colors) {
      return this.props.style
    }
    const color = this.props.colors[this.state.status]
    if (this.props.type === 'primary' && !this.props.ghost) {
      return {
        backgroundColor: color,
        borderColor: color,
        ...this.props.style,
      }
    }
    return {
      borderColor: color,
      color,
      ...this.props.style,
    }
  }

  private isFinalised () {
    return [Status.FULFILLED, Status.REJECTED].includes(this.state.status)
  }

  private isLoading () {
    return this.state.status === Status.PENDING
  }

  private onClick (event: React.MouseEvent<HTMLButtonElement>) {
    if (this.isFinalised() || ! this.props.onClick) {
      return
    }
    const value = this.props.onClick(event)
    if (!value || !('then' in value)) {
      return value
    }
    this.setState({
      status: Status.PENDING,
    })
   ;(value as unknown as Promise<unknown>)
      .then(() => {
        this.setStatus(Status.FULFILLED)
        this.enqueueReset()
      })
      .catch(() => {
        this.setStatus(Status.REJECTED)
        this.enqueueReset()
      })
  }

  private setStatus (status: Status) {
    this.setState({ status })
  }
}
