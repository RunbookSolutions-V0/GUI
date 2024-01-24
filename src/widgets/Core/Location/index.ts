import BasicWidget from "./Basic.vue";
import MapWidget from "./Map.vue";
import TreeWidget from "./Tree.vue";

const widgets = [
    {
        name: "Location Details",
        id: "e5adbb57-66c1-4e15-8729-139da67792d1",
        as: BasicWidget,
        defaultProps: {  },
        height: 2,
        width: 1,
        pages: ["core-location-view"],
      },
      {
        name: "Location Map",
        id: "b1ae17db-c300-4be8-8664-b4bc8eb6b10c",
        as: MapWidget,
        defaultProps: {  },
        height: 2,
        width: 2,
        pages: [".*"],
      },
      {
        name: "Location Tree Chart",
        id: "499c1a07-4dbe-457f-aac3-1570e6341a8d",
        as: TreeWidget,
        defaultProps: {  },
        height: 2,
        width: 2,
        pages: [".*"],
      },
];

export default widgets;