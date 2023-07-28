import React , {useState} from 'react'
import Settings from '../Settings'
import Pagination from './Pagination';


const Team = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // Replace this with the total number of pages

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // You can perform any data fetching or updating logic here
  };

  return (
    <>
      <Settings/>
      <div class="px-4 sm:px-6">
  <div class="mb-4 flex items-center justify-between">
    <h2 class="mb-1 pb-1 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">Team</h2>
    {/* <div class="flex items-center justify-end text-sm">
      <div aria-expanded="false">
      
      </div>
    </div> */}
  </div>
  <div class="flex flex-col">
    <span class="mb-3"></span>
    <div class="mb-6 flex flex-row content-start justify-between gap-6">
      <div class="flex grow flex-col gap-2">
        <span class="font-bold">1 team member. </span>
        {/* <div>
          <span>Need more seats? <span class="cursor-pointer font-semibold text-indigo-600 underline underline-offset-2">Upgrade now</span></span>
        </div> */}
        <button disabled="" type="button" class="w-[200px] relative rounded-md border-0 bg-[#334977] px-3 py-1.5 text-sm font-semibold text-white shadow-sm outline-none ring-0 ring-blue-600 transition-all duration-200 hover:outline-none hover:ring-0 focus:outline-none active:ring-0" title="Invite Member">
          <span class="mx-auto flex select-none items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
            </svg>
            <div>Invite team members</div>
          </span>
        </button>
      </div>
      <div class="basis-1/2">
        <div class="w-full space-y-1.5">
          <label for="search-team-members" class="sr-only"
            ><span class="flex items-center space-x-1"><span>Search team members</span></span></label
          >
          <div class="!mt-0 flex w-full items-center gap-2 rounded-lg bg-white px-3 py-1 outline-none ring-1 ring-gray-200 transition-all duration-150 ease-in-out focus-within:!ring-1 hover:ring-2">
            <div class="flex grow items-center gap-2 py-1.5">
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M6.67,12.44c3.19,0,5.78-2.59,5.78-5.78S9.86,.89,6.67,.89,.89,3.48,.89,6.67s2.59,5.78,5.78,5.78Z" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M15.11,15.11l-4-4" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <div class="flex grow gap-1">
                <input class="block w-full resize-none text-sm font-normal text-gray-900 outline-none placeholder:text-gray-400" type='text' placeholder='search member'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-10 ring-1 ring-gray-200 md:rounded-lg">
      <table class="min-w-full">
        <thead class="bg-slate-200">
          <tr>
            <th scope="col" class="px-3 py-3.5 text-left text-xs font-semibold uppercase text-gray-700">Member</th>
            <th scope="col" class="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Role</th>
            <th scope="col" class="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell">Joined</th>
            <th scope="col" class="hidden text-left text-xs font-semibold uppercase text-gray-700 sm:table-cell"><span class="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-slate-100">
          <tr>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img
                    className='flex h-10 w-10 items-center justify-center rounded-full text-base font-bold text-white bg-slate-400'
                    src="http://localhost:3000/default.png"
                  />
                </div>
                <div class="ml-4 truncate">
                  <div class="truncate font-medium leading-5 text-gray-900">test</div>
                  <div class="truncate text-sm leading-5 text-gray-500" title="sunilsingh.info2023@gmail.com">test@gmail.com</div>
                </div>
              </div>
            </td>
            <td class="hidden sm:table-cell">Admin</td>
            <td class="hidden sm:table-cell">Jul 27, 2023</td>
            <td class="hidden sm:table-cell"></td>
          </tr>
        </tbody>
      </table>
      
      
    </div>
    
  </div>
</div>

    </>
  )
}

export default Team