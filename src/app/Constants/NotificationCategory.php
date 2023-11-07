<?php

namespace App\Constants;

use ReflectionClass;

abstract class NotificationCategory
{
    const ACCOUNT = 1;
    const TICKET = 2;
    const SYSTEM = 9;

    public static function toArray()
    {
        $class = new ReflectionClass(__CLASS__);
        return $class->getConstants();
    }
}
