<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Packages\JsonResponse;
use App\Services\MemberRelationService;
use App\Services\MemberService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class DashboardController extends Controller
{
    public function __construct(JsonResponse $response)
    {
        parent::__construct($response);
    }

    public function index(): HttpJsonResponse
    {
        $memberService = new MemberService();
        $memberRelationService = new MemberRelationService();
        $totalShares = $memberService->totalShare() + $memberRelationService->totalShare();
        return $this->onItems(['totalShares' => $totalShares]);
    }
}
