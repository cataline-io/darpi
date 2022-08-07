const typeOf = {
  key: {
    mask: (key: string) => {
      let response = 'special'

      if (typeof key !== 'string') return response

      if (key === 'A') response = 'alpha'
      if (key === '9') response = 'numeric'
      if (key === '*') response = 'alphanumeric'

      return response
    },
    input: (key: string) => {
      let response = 'special'

      if (typeof key !== 'string') return response

      const isAlpha = /^[a-zA-Z\u00C0-\u00FF]*$/
      const isNumeric = /^[0-9]$/i

      if (isAlpha.test(key)) response = 'alpha'
      if (isNumeric.test(key)) response = 'numeric'

      return response
    }
  }
}

export default typeOf
