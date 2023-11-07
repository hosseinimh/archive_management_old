<?php

namespace App\Packages;

use App\Facades\Helper;
use App\Http\Resources\Member\MemberResource;
use App\Http\Resources\MemberRelation\MemberRelationResource;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use Exception;

class ShareAction
{
    public function getOwner(int $ownerId, int $isMember): mixed
    {
        try {
            if ($isMember === 0) {
                $service = new MemberRelationService();
                if ($owner = $service->get($ownerId)) {
                    return $owner;
                }
            } else if ($isMember === 1) {
                $service = new MemberService();
                if ($owner = $service->get($ownerId)) {
                    return $owner;
                }
            }
        } catch (Exception $e) {
            Helper::logError($e);
        }
        return null;
    }

    public function getOwnerResource(int $ownerId, int $isMember): mixed
    {
        try {
            if ($isMember === 0) {
                $service = new MemberRelationService();
                if ($owner = $service->get($ownerId)) {
                    return new MemberRelationResource($owner);
                }
            } else if ($isMember === 1) {
                $service = new MemberService();
                if ($owner = $service->get($ownerId)) {
                    return new MemberResource($owner);
                }
            }
        } catch (Exception $e) {
            Helper::logError($e);
        }
        return null;
    }
}
