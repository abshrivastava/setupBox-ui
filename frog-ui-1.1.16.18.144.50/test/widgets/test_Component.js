//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"

import "jsdom-global/register"

import {describe} from "mocha"
import Component, {$} from "widgets/Component"

class Text extends Component {
  render() {
    return <span prop="text" className="Text" />
  }
}

class TextSub extends Component {
  render() {
    return <span prop="text[0:3]" className="Text" />
  }
}


/** @test {Component} */
describe("Component", () => {

  /** @test {Component.constructor()} */
  describe("constructor", () => {
    const component = new Component({})
    class MyComponent extends Component {
      static defaultProps = null
    }

    it("should set dom to null", () => {
      assert.equal(component.dom, null)
    })

    it("should take empty object if defaultProps is null", () => {
      const myComponent = new MyComponent()
      assert.deepEqual(myComponent.constructor.defaultProps, null)
      assert.deepEqual(myComponent.props, {})
    })

    it("should set className to null", () => {
      assert.equal(component.className, null)
    })
  })

  /** @test {$} */
  describe("ref", () => {
    class ComponentWithRef extends Component {
      static ref = "component"
    }

    const component = new ComponentWithRef()

    it("should register instances using the static ref", () => {
      assert.equal(component, $("component"))
    })

    it("should not instanciated multiple times", () => {
      assert.throws(() => new ComponentWithRef(), /already exists/)
    })
  })

  /** @test {Component.defaultProps} */
  describe("defaultProps", () => {
    class Label extends Component {
    }
    class LabelWithDefault extends Label {
      static defaultProps = {text: "default text"}
    }

    const label = new Label({text: "Hello"})
    const labelWithDefault = new LabelWithDefault()
    it("are available through this.props", () => {
      assert.equal(label.props.text, "Hello")
    })

    it("can have default set in the defaultProps static property", () => {
      assert.equal(labelWithDefault.props.text, "default text")
    })
  })

  /** @test {Component.render} */
  describe("render", () => {
    it("should throw an error if not overloaded", () => {
      assert.throws(() => new Component().render(), /Abstract method/)
    })
  })

  /** @test {Component.build} */
  describe("build", () => {
    const text = new Text()
    const dom = text.build()

    it("should store the result of render in this this.dom", () => {
      assert.notEqual(text.dom, null)
    })

    it("should automatically set className based on the first className found", () => {
      assert.equal(dom, text.dom)
    })
  })

  /** @test {Component.build} */
  describe("destroy", () => {
    class Wrapper extends Component {
      render() {
        return <div><Text text="Hello" key="text" /></div>
      }
    }

    it ("should remove the component dom from it's parent", () => {
      const wrapper = new Wrapper()
      wrapper.build()
      wrapper.text.destroy()
      assert.equal(wrapper.dom.children.length, 0)
    })
  })

  /** @test {Component.setProps} */
  describe("setProps", () => {
    const text = new Text({text: "first"})
    const textSub = new TextSub({text: "first"})
    text.build()
    textSub.build()

    text.setProps({text: "second"})
    text.setProps({myprop: "prop"})
    text.setProps() // does nothing
    textSub.setProps({text: "second"})

    it("should update the internal value of the property", (done) => {
      assert.equal(text.props.text, "second")
      assert.equal(textSub.props.text, "second")
      assert.equal(text.props.myprop, "prop")
      done()
    })

    it("should update nodes that are bound to this property", (done) => {
      assert.equal(text.dom.textContent, "second")
      assert.equal(textSub.dom.textContent, "sec")
      done()
    })

    it("should be update with empty string", () => {
      textSub.setProps({text: ""})
      text.setProps({text: ""})
      assert.equal(textSub.dom.textContent, " ")
      assert.equal(text.dom.textContent, " ")
    })

  })

  /** @test {Component.setProp} */
  describe("setProp", () => {

    it("should behave list setProps but for only one property", () => {
      const text = new Text({text: "first"})
      text.build()
      text.setProp("text", "second")
      assert.equal(text.props.text, "second")
    })
  })

  /** @test {Component.show} */
  describe("show", () => {
    it("should remove the hidden BEM state from the component", () => {
      const text = new Text()
      text.build()

      text.dom.classList.add("Text--hidden")
      text.show()
      assert(!text.dom.classList.contains("Text--hidden"))
    })
  })

  /** @test {Component.hide} */
  describe("hide", () => {
    it("should add the hidden BEM state to the component", () => {
      const text = new Text()
      text.build()

      text.hide()
      assert(text.dom.classList.contains("Text--hidden"))
    })
  })

  /** @test {Component.pushState} */
  describe("pushState", () => {
    it("should add a given BEM state to the component", () => {
      const text = new Text()
      text.build()
      text.pushState("italic")
      text.pushState("bold", true)

      assert(text.dom.classList.contains("Text--italic"))
      assert(text.dom.classList.contains("Text--bold"))
    })
  })

  /** @test {Component.pullState} */
  describe("pullState", () => {
    it("should remove a given BEM state from the component", () => {
      const text = new Text()
      text.build()

      text.dom.classList.add("Text--italic")
      text.dom.classList.add("Text--bold")
      assert(text.dom.classList.contains("Text--italic"))
      assert(text.dom.classList.contains("Text--bold"))
      text.pullState("italic")
      text.pullState("bold", true)
      assert(!text.dom.classList.contains("Text--italic"))
      assert(!text.dom.classList.contains("Text--bold"))
    })
  })
})
