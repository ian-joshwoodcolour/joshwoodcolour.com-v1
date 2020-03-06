import { init } from '@rematch/core'
import createRematchPersist from '@rematch/persist'
import models from './models'

const persistPlugin = createRematchPersist({
  throttle: 500,
  version: 1,
})

const store = init({
  models,
  plugins: [
    persistPlugin
  ],
})

export default store
