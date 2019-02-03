/**
 * These names from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Description
 */
export enum Status {
 FULFILLED = 'FULFILLED',
 INITIALISED = 'INITIALISED',
 PENDING = 'PENDING',
 REJECTED = 'REJECTED',
}

export type FinalStatus = Status.FULFILLED | Status.REJECTED
