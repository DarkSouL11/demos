import React from "react";

import {
  Card,
  Header,
  Icon,
  PageMeta,
  Tappable
} from "../../components/general";
import { mobxify } from "../../components/hoc";
import toastStore from "../../stores/toastStore";

function ComponentsPage() {
  function buttonsUi() {
    return (
      <Card className="demo-card">
        <div className="title mgn-b">Buttons</div>
        <div className="demo-items">
          <div className="demo-items is-horizontal">
            <Tappable className="btn">Primary</Tappable>
            <Tappable className="btn btn-inverted">Inverted</Tappable>
            <Tappable className="btn btn-small">Small</Tappable>
            <Tappable className="btn btn-round">
              <Icon name="more_vert" />
            </Tappable>
          </div>
          <div className="demo-items is-horizontal">
            <Tappable className="btn btn-success">Success</Tappable>
            <Tappable className="btn btn-success btn-inverted">
              Inverted
            </Tappable>
            <Tappable className="btn btn-success btn-small">Small</Tappable>
            <Tappable className="btn btn-success btn-round">
              <Icon name="check" />
            </Tappable>
          </div>
          <div className="demo-items is-horizontal">
            <Tappable className="btn btn-danger">Danger</Tappable>
            <Tappable className="btn btn-danger btn-inverted">
              Inverted
            </Tappable>
            <Tappable className="btn btn-danger btn-small">Small</Tappable>
            <Tappable className="btn btn-danger btn-round">
              <Icon name="delete" />
            </Tappable>
          </div>
        </div>
      </Card>
    );
  }

  function cardUi() {
    return (
      <Card className="demo-card">
        <div className="title mgn-b">Card Title</div>
        <p>
          This is an example usage for <b>Card</b> component. Custom styles can
          be added using "className" prop
        </p>
      </Card>
    );
  }

  function iconsUi() {
    return (
      <Card className="demo-card">
        <div className="title mgn-b">Icons</div>
        <div className="demo-items is-horizontal">
          <Icon name="settings" />
          <Icon name="edit" />
          <Icon name="delete" />
          <Icon name="wifi" />
          <Icon name="more" />
        </div>
      </Card>
    );
  }

  function toastUi() {
    return (
      <Card className="demo-card">
        <div className="title mgn-b">Toast</div>
        <Tappable
          className="btn"
          onClick={() => toastStore.show("This is a demo toast")}
        >
          Show Toast
        </Tappable>
      </Card>
    );
  }

  return (
    <div className="layout">
      <PageMeta title="Components" />
      <Header backTo="/" title="Components" />
      <div className="layout-content">
        <div className="row is-tiled is-filled">
          <div className="col is-3-desktop">{cardUi()}</div>
          <div className="col is-3-desktop">{iconsUi()}</div>
          <div className="col is-3-desktop">{buttonsUi()}</div>
          <div className="col is-3-desktop">{toastUi()}</div>
        </div>
      </div>
    </div>
  );
}

export default mobxify("toastStore")(ComponentsPage);
