//
// Copyright (C) 2006-2016 Wyplay, All Rights Reserved. This source code and
// any compilation or derivative thereof is the proprietary information of
// Wyplay and is confidential in nature. Under no circumstances is this
// software to be exposed to or placed under an Open Source License of any type
// without the expressed written permission of Wyplay.
//

import assert from "assert"

import "jsdom-global/register"

import Component, {$} from "widgets/Component"

class Headlines extends Component {
  render() {
    return (
      <div class="Headlines" ref="headlines">
        <h1>Fresh news!</h1>

        <List key="list" ref="list">
          {Array.from({length: 5}, (_, i) =>
            <ListItem collection="items" key={i} text={`Item ${i}`} />)}
        </List>

        <form action="/" method="POST">
          <label htmlFor="subscribe-email" key="label" ref="label">Email</label>
          <input
            id="subscribe-email"
            type="text"
            placeholder="me@example.com" />
          <input type="submit" value="Subscribe" />
        </form>
      </div>
    )
  }
}

class List extends Component {
  render() {
    return (
      <ul className="List">
        {this.children}
      </ul>
    )
  }
}

class ListItem extends Component {
  render() {
    return (
      <li className="ListItem" prop="text" />
    )
  }
}

describe("JSX", () => {
  const headlines = new Headlines()
  headlines.build()

  it("should use ref to store top level references to specific nodes", () => {
    assert.equal(headlines.dom, $("headlines"))
  })

  it("should use ref store to top level reference to specific nodes", () => {
    assert.equal(headlines.dom.querySelector("label"), $("label"))
  })

  it("should use key yto store inner references to children components",
    () => {
      assert.equal(headlines.list, $("list"))
    })

  it("should use key to store inner references to children nodes", () => {
    assert.equal(headlines.label, $("label"))
  })

  it("should use collection to store inner references to multiple " +
  "components/nodes", () => {
    assert.equal(headlines.list.items.length, 5)
  })

  it("should store key/collection references on the parent", () => {
    assert.equal(headlines.items, undefined)
  })

  it("should use prop to bind a node to a giver property", () => {
    assert.equal(headlines.list.items[0].dom.textContent, "Item 0")
  })

  it("prop-bound nodes are automatically updated with setProp(s)", () => {
    headlines.list.items[0].setProp("text", "First item")
    assert.equal(headlines.list.items[0].dom.textContent, "First item")
  })
})
