import React from 'react';

const Table = () => {

  const tableData = [
    {
      id: 1,
      user: 'Roshan kc',
      creditsUsed: 100,
      generations: 4,
      templates: 10,
      projects: 1,
    }
  ];

  return (
<div class="flex flex-col mt-4 mb-2">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black">User</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black">Credits used</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black">Templates</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-black">projects</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          {tableData.map((data,index)=>{
            return (
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-black ">{data.user}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-black ">{data.creditsUsed}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-black ">{data.templates}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-black ">{data.projects}</td>              
                </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
};

export default Table;
