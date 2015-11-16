@extends('admin.main')

@section('content')
<div class="user-data clearfix">
    <div class="col-sm-12">
        {!! link_to_route('admin.users.edit', 'Edit', $user->id, ['class' => 'btn btn-success button-my']) !!}
        {!! link_delete(route('admin.users.destroy', [$user->id]), 'Delete', ['class' => 'btn btn-danger button-my']) !!}
        <div class="col-sm-2">
            <img src="{{ $user->avatar_url['medium'] }}">
        </div>
        <div class="col-sm-10">
            <h3>{{ $user->first_name . ' ' . $user->last_name }}</h3>

            <p><span>E-mail: </span>{!! link_to('mailto:' . $user->email, $user->email) !!}</p>

            <p>
                <span>Roles: </span>
                @foreach($user->roles as $role)
                    {{ $role->display_name }}
                @endforeach
            </p>

            <p><span>Registration: </span>{{ $user->created_at }}</p>
        </div>
    </div>
</div>
<div>
    <hr>
    <form method="post" action="#" class="search-form">
        <input type="text" placeholder="Start typing...">
        <input type="submit" value="Search">
    </form>
    <table class="col-xs-12">
        <thead>
        <tr>
            <th class="col-xs-4">Spots</th>
            <th class="col-xs-3">Spot Type</th>
            <th class="col-xs-3">Spot category</th>
            <th class="col-xs-1"></th>
            <th class="col-xs-1"></th>
        </tr>
        </thead>
        <tbody>
        @foreach($spots as $spot)
            <tr>
                <td><a href="#">{{ $spot->title }}</a></td>
                <td><p>{{ $spot->category->type['display_name'] }}</p></td>
                <td><p><img src="{{ $spot->category->icon_url }}"> {{ $spot->category['name'] }}</p></td>
                <td><a href="#" class="delete"></a></td>
                <td><a href="#" class="edit-spot"></a></td>
            </tr>
        @endforeach
        </tbody>
    </table>
    <div class="col-xs-12 pagination">
        {!! $spots->render() !!}
    </div>
</div>
@endsection