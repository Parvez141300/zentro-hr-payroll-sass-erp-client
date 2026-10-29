import HrAttendanceStats from '@/components/modules/(dashboard)/hrManagerDashboard/statistics/HrAttendanceStats'
import HrLeaveStats from '@/components/modules/(dashboard)/hrManagerDashboard/statistics/HrLeaveStats'
import React from 'react'

const HrManagerDashboard = () => {
  return (
    <div className='space-y-10'>
      <HrAttendanceStats />
      <HrLeaveStats />
    </div>
  )
}

export default HrManagerDashboard