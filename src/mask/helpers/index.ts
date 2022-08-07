export { default as createState } from './createState'
export { default as deletePreviousSpecialKeys } from './deletePreviousSpecialKeys'
export { default as eventDetails } from './eventDetails'
export { default as hasMoreAlphaOrNumeric } from './hasMoreAlphaOrNumeric'
export { default as injectSpecialKeys } from './injectSpecialKeys'
export { default as keysMatch } from './keysMatch'
export { default as preventTyping } from './preventTyping'
export { default as typeOf } from './typeOf'

export interface UserEvent extends InputEvent {
  readonly target: HTMLInputElement
}
