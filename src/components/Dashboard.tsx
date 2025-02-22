'use client';

import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import { trpc } from '@/app/_trpc/client';
import { Ghost, Loader2, MessageSquare, Plus, Trash } from 'lucide-react';
import { format } from 'date-fns';

import MaxWidthWrapper from './MaxWidthWrapper';
import UploadButton from './UploadButton';
import { Button } from './ui/button';

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useContext();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate: ({ id }) => {
      setCurrentlyDeletingFile(id);
    },
    onSettled: () => {
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <MaxWidthWrapper>
      <div className="mt-8 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-orange-500">My Files</h1>
        <UploadButton />
      </div>

      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-orange-300 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-orange-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-orange-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-orange-500">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), 'MMM yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    10
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    variant="destructive"
                    onClick={() => {
                      deleteFile({ id: file.id });
                    }}
                  >
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3}></Skeleton>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="h-8 w-8 text-orange-500" />
          <h3 className="font-sembold text-xl">Pretty empty around here!</h3>
          <p>Let &apos;s upload your first pdf...</p>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Dashboard;
