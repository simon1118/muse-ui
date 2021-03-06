import { findParentSlot } from '../../utils';
export default {
  props: {
    selected: Boolean,
    date: Date,
    disabled: Boolean
  },
  data () {
    return {
      hover: false
    };
  },
  computed: {
    isNow () {
      const now = new Date();
      return this.date && this.date.getYear() === now.getYear() && this.date.getMonth() === now.getMonth() && this.date.getDate() === now.getDate();
    },
    dayButtonClass () {
      return {
        selected: this.selected,
        disabled: this.disabled,
        now: this.isNow
      };
    }
  },
  render (h) {
    const daySlot = findParentSlot('day', this);
    return this.date ? h('button', {
      staticClass: 'mu-day-button',
      class: this.dayButtonClass,
      on: this.$listeners,
      domProps: {
        disabled: this.disabled
      }
    }, [
      daySlot ? daySlot(this.$props) : (
        h('div', { class: 'mu-day-button-bg' }),
        h('span', {
          class: 'mu-day-button-text',
          domProps: {
            innerHTML: this.date.getDate()
          }
        })
      )
    ]) : h('span', { class: 'mu-day-empty' });
  }
};
