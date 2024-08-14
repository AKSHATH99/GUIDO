import React from 'react'

const HomeShimmer = () => {
  return (
    <div class="border border-blue-100 shadow rounded-md p-4 mt-14 max-w-sm w-[700px] ml-28">
    <div class="animate-pulse flex space-x-4">
        <div>
      <div class="rounded-md bg-slate-200 h-44 w-44"></div>
      <div class="rounded-md bg-slate-200 h-10 mt-10 w-44"></div>
      <div class="rounded-md bg-slate-200 h-10 mt-5 w-44"></div>
      </div>
      <div class="flex-1 space-y-6 py-1">
        <div class="h-2 bg-slate-200 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
            <div class="h-2 bg-slate-200 rounded col-span-1 border"></div>
          </div>
          <div class="h-2 bg-slate-200 rounded border "></div>
          <div class="h-44 mt-10 bg-slate-200 rounded  "></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomeShimmer
