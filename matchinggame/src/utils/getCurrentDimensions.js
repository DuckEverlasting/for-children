const getCurrentDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  smallest: window.innerWidth > window.innerHeight ? "vh" : "vw"
})

export default getCurrentDimensions