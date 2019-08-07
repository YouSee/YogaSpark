declare let px: {
  getPackageBaseFilePath: () => string
}

export const font: string = `${px.getPackageBaseFilePath()}/MerriweatherSans-Regular.ttf`
export const fontBold: string = `${px.getPackageBaseFilePath()}/MerriweatherSans-Bold.ttf`
export const roundedRect: string = `${px.getPackageBaseFilePath()}/rrect.svg`
