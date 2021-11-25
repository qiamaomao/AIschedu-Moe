function scheduleHtmlParser(html) {
  // 初始化 result
  let result = []
  const $ = cheerio.load(html, { decodeEntities: false })

  //  遍历所有课
  $(".moe").find(".common-item").each(function (index, ele) {

    // 遍历每一门课
    $(this).find('.common-course').each(function () {

      // 获取课程信息
      let commonCourse = $(this).text().trim().split(" ")

      // 追加 课程
      result.push({
        //课程名
        name: $(ele).find('.name').text(),
        //教室
        position: commonCourse[4],
        //老师     
        teacher: commonCourse[5],
        //weeks
        weeks: weeks(commonCourse[0]),
        //Day
        day: day(commonCourse[1]),
        //sections
        sections: sections(commonCourse[2])
      })
    })

  })


  console.log(result)

  // 初始化 _sectionTimes
  let _sectionTimes = [
    {
      "section": 1,
      "startTime": "08:20",
      "endTime": "09:05"
    }, {
      "section": 2,
      "startTime": "09:15",
      "endTime": "10:00"
    }, {
      "section": 3,
      "startTime": "10:20",
      "endTime": "11:05"
    }, {
      "section": 4,
      "startTime": "11:05",
      "endTime": "12:00"
    }, {
      "section": 5,
      "startTime": "13:30",
      "endTime": "14:45"
    }, {
      "section": 6,
      "startTime": "14:15",
      "endTime": "15:10"
    }, {
      "section": 7,
      "startTime": "15:20",
      "endTime": "16:05"
    }, {
      "section": 8,
      "startTime": "16:15",
      "endTime": "17:00"
    }, {
      "section": 9,
      "startTime": "18:00",
      "endTime": "18:45"
    }, {
      "section": 10,
      "startTime": "18:55",
      "endTime": "19:40"
    }]

  return { courseInfos: result, sectionTimes: _sectionTimes }
}

// 处理day
function day(day) {
  switch (day) {
    case "周一":
      return 1
    case "周二":
      return 2
    case "周三":
      return 3
    case "周四":
      return 4
    case "周五":
      return 5
    case "周六":
      return 6
    case "周日":
      return 7
  }

}

// 处理 sections
function sections(str) {
  let sections = str.split("-").map((item) => {
    return {
      section: item.split("节")[0]
    }
  })

  return sections
}

// 处理 weeks
function weeks(str) {
  let weeks = []
  let [a, b] = str.match(/\d+/g)
  for (let i = +a; i <= +b; i++) {
    weeks.push(i)
  }
  return weeks
}
