function scheduleHtmlParser(html) {
  let result = []
  result = parseList(html)

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

function parseList(html) {

  const $ = cheerio.load(html, { decodeEntities: false })

  let result = []

  $(".week-wrap").find(".common-week").each((index, ele) => {

    let day = ++index
    let m = 1
    $(ele).find(".item-wrap").each( (index, ele)=> {

      $(ele).find(".common-item").each( (index, ele) => {

        const course = {}
        course.name = $(ele).find('.name').text().split(" ")[0]
        course.teacher = $(ele).find('.teacher>.content').text().split(" ")[0].trim()
        course.weeks = []
        for (let i = +($(ele).find('.time>.content').text()[2]); i <= ($(ele).find('.time>.content').text().split("周")[0].slice(4, -1)); i++) {
          course.weeks.push(i)
        }
        course.day = day
        course.sections = []

        let e
        switch (day) {
          case 1:
            e = "周一"
            break;
          case 2:
            e = "周二"
            break;
          case 3:
            e = "周三"
            break;
          case 4:
            e = "周四"
            break;
          case 5:
            e = "周五"
            break;
          case 6:
            e = "周六"
            break;
          case 7:
            e = "周日"
            break;
        }

        let ooo = []
        $(ele).find('.course-content').find(".course-item-list").each((index, ele) => {
          ooo.push({
            day: $(ele).find('.time>.content').text().split(" ")[1],
            pos: $(ele).find('.address>.content').text()
          })
        })

        for (const item of ooo) {
          if (item.day == e) {
            course.position = item.pos
          }
        }

        let str = $(ele).find('.time>.content').text()
        str = str.slice(str.search(e))

        let o = str.split(" ")[1].split("-")


        for (const key of o.values()) {

          if (key.length == 1) {
            course.sections.push({
              section: key
            })
          } else {
            course.sections.push({
              section: key.slice(0, -1)
            })
          }


        }

        result.push(course)

      })
    })

  })
  console.log(result);
  return result
}