<template>
    <button

    >
      <!-- <svg class="remix h-full w-full">
        <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
      </svg> -->
    </button>
  </template>
  
  <script>
//   import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";
  
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      },
  
      title: {
        type: String,
        required: true,
      },
  
      action: {
        type: Function,
        required: true,
      },
  
      isActive: {
        type: Function,
        default: () => {},
      },
    },
  
    data() {
      return {
        remixiconUrl,
      };
    },
  };
  </script>
  
  <style>
  button.isActive {
    @apply text-white bg-blue-700;
  }
  </style>
  