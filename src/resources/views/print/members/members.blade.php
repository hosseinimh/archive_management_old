<!DOCTYPE html>
<html lang="fa" dir="rtl">

<head>
    <base href="./">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="keyword" content="">
    <link rel="apple-touch-icon" sizes="180x180" href="{{$THEME::BASE_URL}}/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$THEME::BASE_URL}}/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$THEME::BASE_URL}}/favicon-16x16.png">
    <link rel="manifest" href="{{$THEME::BASE_URL}}/site.webmanifest">
    <link rel="mask-icon" href="{{$THEME::BASE_URL}}/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <title>{{ __('general._title') }}</title>
    @php
    try {
    $filename = 'assets/css/style_rtl.css';
    $fileModified = substr(md5(filemtime($filename)), 0, 6);
    } catch (\Exception) {
    $fileModified = '';
    }
    @endphp
    <link href="{{$THEME::CSS_PATH}}/style_rtl.css?v={{$fileModified}}" rel="stylesheet">
    <style>
        th,
        td {
            border: 1px solid #000;
            padding: 0 5px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
        }
    </style>
</head>

<body style="background-color: #fff;">
    @if (isset($members))
    @foreach ($members->chunk(38) as $chunk)
    <div style="break-after: always; break-before: always; margin-bottom: 2rem;">
        <div style="border: 1px solid #000; display: flex; align-items: center; padding: 1rem;">
            <div style="flex-grow: 2; padding: 2rem;">
                <h1 style="text-align: center;">{{ __('general._title') }}</h1>
            </div>
            <div style="flex-grow: 1; height: 150px;"></div>
        </div>
        <div class="d-flex just-between pd-td-20 pd-lr-10">
            <div>
                <span>{{ __('member.all_members_count') }}:</span>
                <span style="margin: 0 0.5rem 0 2rem; font-weight: bold;">{{number_format($count)}}</span>
                <span>{{ __('member.all_member_relations_count') }}:</span>
                <span style="margin: 0 0.5rem 0 2rem; font-weight: bold;">{{number_format($memberRelationsCount)}}</span>
                <span>{{ __('member.all_count') }}:</span>
                <span style="margin: 0 0.5rem 0 2rem; font-weight: bold;">{{number_format($count + $memberRelationsCount)}}</span>
            </div>
            <span>{{$date}}</span>
        </div>
        <div>
            <table style="border-collapse: collapse;">
                <tr>
                    <th style="width: 60px;">{{ __('member.card_no') }}</th>
                    <th>{{ __('member.name_family') }}</th>
                    <th style="width: 80px;">{{ __('member.father_name') }}</th>
                    <th style="width: 80px;">{{ __('member.birth_date') }}</th>
                    <th style="width: 80px;">{{ __('member.national_no') }}</th>
                    <th style="width: 60px;">{{ __('member.identity_no') }}</th>
                    @if (isset($mobile) && $mobile === 1)
                    <th style="width: 80px;">{{ __('member.mobile') }}</th>
                    @endif
                    <th style="width: 80px;">{{ __('member.member_relations_count') }}</th>
                    <th style="width: 80px;">{{ __('member.village') }}</th>
                </tr>
                @foreach ($chunk as $member)
                <tr>
                    <td>{{$member['card_no']}}</td>
                    <td>{{$member['name']}} {{$member['family']}}</td>
                    <td>{{$member['father_name']}}</td>
                    <td>{{$member['birth_date']}}</td>
                    <td>{{$member['national_no']}}</td>
                    <td>{{$member['identity_no']}}</td>
                    @if (isset($mobile) && $mobile === 1)
                    <td>{{$member['mobile']}}</td>
                    @endif
                    <td>{{$member['member_relations_count']}}</td>
                    <td>{{$member['village_name']}}</td>
                </tr>
                @endforeach
            </table>
        </div>
    </div>
    @endforeach
    @endif
</body>

</html>