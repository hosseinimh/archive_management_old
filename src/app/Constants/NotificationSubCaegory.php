<?php

namespace App\Constants;

use ReflectionClass;

abstract class NotificationSubCaegory
{
    const LOGIN_SUCCEED = 111;
    const LOGIN_FAILED = 112;
    const TICKET_USER_REGISTERED = 211;
    const TICKET_ADMINISTRATOR_REGISTERED = 212;
    const TICKET_THREAD_USER_REGISTERED = 213;
    const TICKET_THREAD_ADMINISTRATOR_REGISTERED = 214;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
