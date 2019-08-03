import { action, decorate, observable } from "mobx";

// TODO add queuing support
export class ToastStore {
  _timer = null;

  content = null;
  // Time in ms
  timeout = 2000;

  show = (content, timeout = 2000) => {
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
    this.timeout = 2000;
  };
}

decorate(ToastStore, {
  content: observable,
  show: action,
  hide: action
});

export default new ToastStore();
