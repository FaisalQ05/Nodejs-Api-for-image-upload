const errorHandler = (error, req, res, next) => {
  // const status = res.statusCode ? res.statusCode : 500
  const status =
    res.statusCode === 200 ? 400 : res.statusCode ? res.statusCode : 500
  res.status(status)
  // console.log({ error })

  res.json({ message: error.message, isError: true })
}

module.exports = { errorHandler }
