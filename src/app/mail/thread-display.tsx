'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"  
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useThreads from '@/hooks/use-threads';
import { Archive, ArchiveX, Clock, MoreVertical, Trash2 } from 'lucide-react';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EmailDisplay from "./email-display";
import ReplyBox from "./reply-box";
import { useAtom } from "jotai";
import { isSearchingAtom } from "./search-bar";
import SearchDisplay from "./search-display";

const ThreadDisplay = () => {
    const { threadId, threads } = useThreads()
    const thread = threads?.find(t => t.id === threadId)
    const [isSearching] = useAtom(isSearchingAtom)

    return (
        <div className='flex flex-col h-full'>
            {/* Buttons row */}
            <div className='flex items-center p-2'>
                <div className='flex items-center gap-2'>
                    <Button variant={'ghost'} size={'icon'} disabled={!threadId}>
                        <Archive className='size-4' />
                    </Button>
                    <Button variant={'ghost'} size={'icon'} disabled={!threadId}>
                        <ArchiveX className='size-4' />
                    </Button>
                    <Button variant={'ghost'} size={'icon'} disabled={!threadId}>
                        <Trash2 className='size-4' />
                    </Button>
                </div>
                <Separator orientation='vertical' className='ml-2'/>
                <Button className='ml-2' variant={'ghost'} size={'icon'} disabled={!threadId}>
                    <Clock className='size-4' />
                </Button>
                <div className='flex items-center ml-auto'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className='ml-2' variant={'ghost'} size={'icon'} disabled={!threadId}>
                                <MoreVertical className='size-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                            <DropdownMenuItem>Star thread</DropdownMenuItem>
                            <DropdownMenuItem>Add label</DropdownMenuItem>
                            <DropdownMenuItem>Mute thread</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <Separator />
            {isSearching ? <SearchDisplay />: (
                <>    
                    {thread ? <>
                        <div className="flex flex-col flex-1 overflow-scroll">
                            <div className="flex items-center p-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <Avatar>
                                        <AvatarImage alt='avatar' />
                                        <AvatarFallback>
                                            {thread.emails[0]?.from?.name?.split(' ').map(chunk => chunk[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <div className="font-semibold">
                                            {thread.emails[0]?.from?.name}
                                            <div className="text-xs line-clamp-1">
                                                {thread.emails[0]?.subject}
                                            </div>
                                            <div className="text-xs line-clamp-1">
                                                <span className="font-medium">
                                                    Reply-To:
                                                </span>
                                                {thread.emails[0]?.from?.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {thread.emails[0]?.sentAt && (
                                    <div className="ml-auto text-xs text-muted-foreground">
                                        {format(new Date(thread.emails[0]?.sentAt), 'PPpp')}
                                    </div>
                                )}
                            </div>

                            <Separator />
                            <div className="max-h-[calc(100vh-500px)] overflow-scroll flex flex-col">
                                <div className="p-6 flex flex-col gap-4">
                                    {thread.emails.map(email => {
                                        return <EmailDisplay key={email.id} email={email} />
                                    })}
                                </div>
                            </div>
                            <div className="flex-1"></div>
                            <Separator className="mt-auto"/>
                            <ReplyBox />
                        </div>
                    </> : <>
                        <div className="p-8 text-center text-muted-foreground">
                            No message selected
                        </div>
                    </>}
                </>
            )}

        </div>
    )
};

export default ThreadDisplay;
