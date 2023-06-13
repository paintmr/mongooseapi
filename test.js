const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b)
    }, 100)
  })
}

const doWork = async () => {
  const sum = await add(1, 99)
  const sum2 = await add(sum, 9)
  const sum3 = await add(sum2, 29)
  console.log(sum3)
}

doWork()
