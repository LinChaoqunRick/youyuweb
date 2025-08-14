import http from '@youyu/shared/network';
import { useEffect } from 'react';
import { GET_OVERVIEW_DATA } from '@youyu/shared/apis/overview.ts';

function Analysis() {
  useEffect(() => {
    http.get(GET_OVERVIEW_DATA).then(res => {
      console.log(res);
    });
  }, []);
  return (
    <div>
      今日访问数量
      本月访问数量
      最近访问数据（20）
      地图
      （总用户量、总文章数、总笔记(章节)数、总时刻数、总相册数、总留言数）
    </div>
  );
}

export default Analysis;
