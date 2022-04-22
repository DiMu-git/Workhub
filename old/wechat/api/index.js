

import member from './member'
import todayAttendance from './today-attendance'
import orders from './orders'

const json = {
	member,
	todayAttendance,
	orders,
}

export default (name) => new Promise(resolve => resolve(json[name]), 500)