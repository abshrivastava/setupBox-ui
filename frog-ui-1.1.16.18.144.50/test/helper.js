import Emitter from "component-emitter"

/**
 * Simple helper to return a 200 response with the given object serialized in
 * JSON as body.
 */
export function okJSON(response, body) {
  return response.status(200)
    .header("Content-Type", "application/json")
    .body(JSON.stringify(body))
}

export class MockEventSource {
  constructor() {
    this._emitter = new Emitter()
  }

  addEventListener(eventName, callback, capture) {
    this._emitter.on(eventName, callback)
  }

  removeEventListener(eventName, callback, capture) {
    this._emitter.off(eventName, callback)
  }

  emit(eventName, data={}) {
    this._emitter.emit(eventName, {data: JSON.stringify(data)})
  }
}
