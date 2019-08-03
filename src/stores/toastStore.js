import { action, decorate, observable } from "mobx";

const defaultTimeout = 1000;

// TODO add queuing support
export class ToastStore {
  _timer = null;

  content = null;
  // Time in ms
  timeout = defaultTimeout;

  show = (content, timeout = defaultTimeout) => {
    // Hide if there is any `Toast`
    this.hide();

    this.content = content;
    this.timeout = timeout;

    this._timer = setTimeout(this.hide, timeout);
  };

  // Hides any active toast
  hide = () => {
    clearTimeout(this._timer);

    this.content = null;
    this.timeout = defaultTimeout;
  };
}

decorate(ToastStore, {
  content: observable,
  show: action,
  hide: action
});

export default new ToastStore();
