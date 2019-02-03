import Button, { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { Status } from './Status'

export type Props = {
  colors: Colors,
  labels?: Labels,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>,
  timeout: number,
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

export class PromiseButton extends React.Component<Props, State> {

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

  constructor (props: Props) {
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
    if (!this.isFinalised()) {
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
    if (this.isFinalised()) {
      return
    }
    this.setState({
      status: Status.PENDING,
    })
    this.props.onClick(event)
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
