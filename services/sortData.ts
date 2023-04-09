import calculateOverall from "./calculateOverall";

export default function sortData(objectArray: any, propertyName: any, sortType: any, sortAsc: boolean) {
  if (propertyName === "overall") {
    if (sortAsc) {
      objectArray.sort(function (a: any, b: any) {
        if (calculateOverall(a) < calculateOverall(b)) {
          return -1;
        }
        if (calculateOverall(a) > calculateOverall(b)) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a: any, b: any) {
        if (calculateOverall(a) > calculateOverall(b)) {
          return -1;
        }
        if (calculateOverall(a) < calculateOverall(b)) {
          return 1;
        }
        return 0;
      });
    }
  } else if (sortType === "abc") {
    if (sortAsc) {
      objectArray.sort(function (a: any, b: any) {
        if (a[propertyName].toLowerCase() < b[propertyName].toLowerCase()) {
          return -1;
        }
        if (a[propertyName].toLowerCase() > b[propertyName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a: any, b: any) {
        if (a[propertyName].toLowerCase() > b[propertyName].toLowerCase()) {
          return -1;
        }
        if (a[propertyName].toLowerCase() < b[propertyName].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }
  } else {
    if (sortAsc) {
      objectArray.sort(function (a: any, b: any) {
        if (a[propertyName] < b[propertyName]) {
          return -1;
        }
        if (a[propertyName] > b[propertyName]) {
          return 1;
        }
        return 0;
      });
    } else {
      objectArray.sort(function (a: any, b: any) {
        if (a[propertyName] > b[propertyName]) {
          return -1;
        }
        if (a[propertyName] < b[propertyName]) {
          return 1;
        }
        return 0;
      });
    }
  }
}
