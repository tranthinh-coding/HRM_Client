export const numberWithCommas = (number: number | string) => {
  return Number(number)
    .toString()
    .replace(/\B(?=\d{3})+(?!\d)/g, ',')
}

export const compacNumber = (value: number): string => {
  const sufflixes = ['', 'k', 'm', 'b', 't']
  const suffixNum = Math.floor(('' + value).length / 3)
  let shortValue: string | number = parseFloat(
    (suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  )
  if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
  return shortValue + sufflixes[suffixNum]
}

export const ordinalSuffix = (value: number | string) => {
  const j = Number(value) % 10,
    k = Number(value) % 100
  if (j == 1 && k != 11) return value + 'st'
  if (j == 2 && k != 12) return value + 'nd'
  if (j == 3 && k != 13) return value + 'rd'
  return value + 'th'
}

export const formatCurrencyInWords = (_num: number) => {
  if (typeof _num !== 'number') {
    throw new Error(
      '[HR Warn](formatCurrencyInWords): Invalid currency, expect type number, got string'
    )
  }
  const num = Number(_num)

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.0+$/, '') + ' tỷ'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.0+$/, '') + ' triệu'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.0+$/, '') + ' nghìn'
  }

  return num.toString()
}
