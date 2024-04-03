// Hash Set unlike Hash Map only stores Keys. Linked List used to handle collisions

const HashSet = () => {
    let map = [];
    let buckets = 16;
  
    // hashing function for a key
  
    const hash = (key) => {
      let hashCode = 0;
  
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i))%buckets;
      }
  
      return hashCode;
    };
  
    // check if length is greater than buckets
    const checkLength = (arrIndex) => {
      if (arrIndex < 0 || arrIndex >= buckets) {
        throw new Error("Trying to access index out of bound");
      }
    };
  
    //check capacity
    const capacity = () => {
      let count = 0;
      for (x of map) {
        if (x != null) {
          count++;
        }
      }
      return (count / buckets);
    };
  
    //compare current capacity v.s load factor;
    const loadFactorCompare = () => {
      const loadFactor = 0.75;
  
      if (capacity() >= loadFactor) {
          buckets = buckets * 2;
          console.log('MORE BUCKETS!');
      }
    }
  
    // set key
    const set = (key) => {
      let arrIndex = hash(key);
  
      checkLength(arrIndex);
      loadFactorCompare();
  
      if (map[arrIndex] === undefined) {
        console.log("EMPTY!");
        map[arrIndex] = {
          key: key,
          next: null,
        };
      } else {
        let oldContent = { ...map[arrIndex] };
        map[arrIndex].key = key;
        map[arrIndex].next = oldContent;
        console.log(map);
      }
  
      return map;
    };
  
    // get has map key
  
    const get = (key) => {
      let arrIndex = hash(key) 
  
      checkLength(arrIndex);
  
      if (map[arrIndex] === undefined) {
        return null;
      } else {
        checkLinkedList(map[arrIndex], key);
      }
    };
  
    // check if linked list contains the pair, if so print pair otherwise return null if not found
    const checkLinkedList = (node, key) => {
      if (key != node.key && node.next === null) {
        return null;
      } else if (key === node.key) {
        return console.log(node.key);
      } else {
        checkLinkedList(node.next, key);
      }
    };
  
    // checking if key is present
    const has = (key) => {
      let arrIndex = hash(key) 
  
      if (map[arrIndex] === undefined) {
        return null;
      } else {
        return { ...map[arrIndex] };
      }
    };
    // remove specific item from hash + LL
    const remove = (key) => {
      let arrIndex = hash(key) 
  
      checkLength(arrIndex);
  
      if (map[arrIndex] === undefined) {
        return false;
      } else if (map[arrIndex].next === null && map[arrIndex].key === key) {
        console.log("test");
        return (map[arrIndex] = null);
      } else {
        removeNodeFromLL(map[arrIndex], key);
      }
    };
    // recursively search through bucket and remove specific key
    const removeNodeFromLL = (node, key) => {
      if (key != node.key && node.next === null) {
        console.log("this idddf");
        return null;
      } else if (key === node.key) {
        console.log("matching first");
        let storeNext = { ...node.next };
        let arrIndex = hash(key)
        map[arrIndex] = storeNext;
        return true;
      } else if (key === node.next.key) {
        console.log("this if");
        let storeNext;
  
        if (node.next.next === null) {
          storeNext = null;
        } else {
          storeNext = { ...node.next.next };
        }
  
        node.next = storeNext;
        console.log(map);
        return true;
      } else {
        return removeNodeFromLL(node.next, key);
      }
    };
  
    const length = () => {
      let counter = 0;
      for (x of map) {
        if (x != null) {
          counter += 1;
        }
      }
      return counter;
    };
  
    const clear = () => {
      map = [];
      return map;
    };
    // get all keys in hash map
    const keys = () => {
      for (x of map) {
        if (x != null) {
          getKeys(x);
        }
      }
    };
  
    // go through LL and grab keys
    const getKeys = (node) => {
      console.log(node.key);
      if (node.next === null) {
        return console.log("End of linked list");
      } else {
        return getKeys(node.next);
      }
    };
  
    // log entires
    const entries = () => {
      let entArr = [];
  
      for (x of map) {
        if (x != null) {
          getEntries(x, entArr);
        }
      }
      console.log(entArr);
    };
    // grab entires from LL
    const getEntries = (node, entArr) => {
      if (node.next === null) {
        return entArr.push(node.key);
      } else {
        entArr.push(node.key);
        return getEntries(node.next, entArr);
      }
    };
  
    return {
      capacity,
      entries,
      keys,
      clear,
      length,
      remove,
      has,
      get,
      map,
      hash,
      set,
    };
  };
  
  let myMap = HashSet();
  myMap.set("Sar");
  myMap.set("Sra");
  myMap.set("raS");
  myMap.set("dsdsds");
  myMap.set("ahghfgfSr");
  myMap.set("avcvxnSr");
  myMap.set("aSbccvbr");
  myMap.set("cvb");
  myMap.set("abvbSr");
  myMap.set("cbcnjlk");
  
  console.log(myMap.get("raS"));
  
  console.log(myMap.has("Sar"));
  // console.log(myMap.remove("Sra"));
  console.log(myMap.map);
  console.log(myMap.length());
  // console.log(myMap.clear());
  myMap.keys();
  myMap.entries();
  
  console.log(myMap.capacity());
  