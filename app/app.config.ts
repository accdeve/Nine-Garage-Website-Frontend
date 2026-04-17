export default defineAppConfig({
  // theme: {
  //   primary: 'primary',
  // },
  ui: {
    formField: {
      slots: {
        label: "text-black",
      },
    },
    input: {
      slots: {
        base: "!bg-neutral-50 !text-neutral-900",
        input: "placeholder:!text-neutral-400",
      },
    },
    select: {
      slots: {
        base: "!bg-neutral-50 !text-neutral-900",
        input: "placeholder:!text-neutral-400",
      },
    },
    selectMenu: {
      slots: {
        base: "!bg-neutral-50 !text-neutral-900",
        content: "!bg-white shadow-lg border border-neutral-200",
        item: "data-[highlighted]:bg-primary-500 data-highlighted:text-white data-[selected]:bg-primary-500 data-[selected]:text-white text-neutral-900 transition-colors duration-200",
      },
    },
    tabs: {
      default: {
        color: "primary",
      },
      slots: {
        indicator: "bg-primary-500",
        trigger: "data-[state=active]:text-primary-500",
      },
    },
    colors: {
      primary: "primary",
      secondary: "neutral",
      accent: "accent",
      success: "success",
      warning: "warning",
      danger: "danger",
    },
    calendar: {
      slots: {
        header: "[&_button]:text-primary-500",
      },
    },
  },
});
