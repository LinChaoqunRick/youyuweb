import axios from 'axios';
import { useEffect } from 'react';

function Workplace() {
  useEffect(() => {
    const allText = [];

    function preCode(str, length = 2) {
      return str.slice(0, length);
    }

    function capitalizeFirstLetter(str) {
      if (!str) return str; // 处理空字符串
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function makeText(item, parent = null) {
      const {
        id, pinyin, name, fullname, location,
      } = item;
      const itemPinYin = (pinyin || []).map(capitalizeFirstLetter).join('');
      // eslint-disable-next-line max-len
      // const text = `${name ? '' : '//'}${itemPinYin || fullname}_${id}("${name ?? fullname}", "${fullname}", ${id}, ${location.lng}, ${location.lat})`; // JAVA
      const text = `"${id}": {name: "${name ?? fullname}", fullname: "${fullname}", lng: ${location.lng}, lat: ${location.lat}}`;
      allText.push(text);
      return text;
    }

    axios.get('/ws/district/v1/list?key=YXNBZ-7XUE3-5RL3H-RCWWK-YQQRF-ZVF3X').then(res => {
      const { result } = res.data;
      const [province, city, district] = result;

      console.log('总长度：', [province, city, district].reduce((pre, n) => pre + n.length, 0));

      const removeFromArray = (arr, item) => {
        const index = arr.indexOf(item);
        if (index !== -1) {
          arr.splice(index, 1);
        }
      };

      province.slice().forEach(p => { // 用 slice() 避免遍历中修改数组出错
        makeText(p);
        removeFromArray(province, p); // 删除已消费的省份

        const province_precode = preCode(p.id);
        const subCities = city.filter(item => item.id.startsWith(province_precode));

        subCities.forEach(c => {
          makeText(c, p);
          removeFromArray(city, c); // 删除已消费的城市

          const city_precode = preCode(c.id, 4);
          const subDistrict = district.filter(item => item.id.startsWith(city_precode));

          subDistrict.forEach(s => {
            makeText(s, c);
            removeFromArray(district, s); // 删除已消费的区县
          });
        });
      });
      setTimeout(() => {
        console.log(allText, province, city, district);
      }, 2000);
    });
  }, []);
  return <div>Workplace</div>;
}

export default Workplace;

// const dataTrs = document.getElementsByClassName('v-grid-row-has-data');
// Array.from(dataTrs).forEach(tr => {
//   const dataTds = tr.getElementsByTagName('td');
//   Array.from(dataTds).forEach((td, index) => {
//     if (index === 0) {
//       td = td.getElementsByTagName('button')[0];
//     }
//     console.log(td.innerHTML);
//   });
// });

// const text = [];
// const propNames = ['englishName', 'alpha2Code', 'alpha3Code', 'code', 'name'];
// const table = document.getElementById('search-table');
// const tbody = table?.getElementsByTagName('tbody')[0];
// const trEles = tbody?.getElementsByTagName('tr');
// Array.from(trEles).forEach(trEle => {
//   const tdEles = trEle.getElementsByTagName('td');
//   const nation = {};
//   Array.from(tdEles).forEach((tEle, index) => {
//     nation[propNames[index]] = tEle.innerHTML;
//   });
//   text.push(nation);
// });
//
// text.echart(item => {
//   const {
//     alpha2Code, alpha3Code, code, name, englishName,
//   } = item;
//   return `${alpha3Code}("${alpha2Code}", "${alpha3Code}", ${code}, "${name}", "${englishName}", "", "")`;
// });
