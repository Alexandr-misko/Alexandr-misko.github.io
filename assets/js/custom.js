// 动态设置网站title，当网页失去焦点时改变网页title，引起用户注意。
// document.addEventListener('DOMContentLoaded', function () {
//     // 调试日志
//     // console.log('[动态标题] 脚本已加载');

//     const originTitle = document.title;
//     let titleTimer;

//     function updateTitle(newTitle, duration = 2000) {
//         document.title = newTitle;
//         if (duration > 0) {
//             clearTimeout(titleTimer);
//             titleTimer = setTimeout(() => {
//                 document.title = originTitle;
//             }, duration);
//         }
//     }

//     // 页面可见性变化
//     document.addEventListener('visibilitychange', function () {
//         // console.log('[动态标题] 可见性变化:', document.hidden);
//         if (document.hidden) {
//             updateTitle(' 😵页面崩溃了😵 ', 0);
//         } else {
//             updateTitle('🎉 欢迎回来！ ');
//         }
//     });

//     // 窗口焦点变化
//     window.addEventListener('blur', function () {
//         // console.log('[动态标题] 窗口失去焦点');
//         updateTitle('💤 我在等你哦～ ', 0);
//     });

//     window.addEventListener('focus', function () {
//         // console.log('[动态标题] 窗口获得焦点');
//         updateTitle('😍 你回来啦！ ');
//     });

//     // console.log('[动态标题] 初始化完成');
// });
