package Convos::Core::Room;

=head1 NAME

Convos::Core::Room - A convos chat room

=head1 DESCRIPTION

L<Convos::Core::Room> is a class describing a L<Convos> chat room.

=head1 SYNOPSIS

  use Convos::Core::Room;
  my $room = Convos::Core::Room->new;

=cut

use Mojo::Base 'Mojo::EventEmitter';
use Role::Tiny::With;

with 'Convos::Core::Role::Log';

=head1 ATTRIBUTES

=head2 frozen

  $str = $self->frozen;

Descrition of why you are not part of this room anymore.

=head2 id

  $str = $self->id;

Unique identifier for this room.

=head2 name

  $str = $self->name;

The name of this room.

=head2 topic

  $str = $self->topic;

Holds the topic (subject) for this room.

=head2 users

  $hash_ref = $self->users;

=cut

has frozen => '';
has id     => sub { die 'id required in constructor' };
has name   => sub { shift->id };
has topic  => '';
has users  => sub { +{} };

=head1 METHODS

=head2 n_users

  $int = $self->n_users;

Returns the number of L</users>.

=cut

sub n_users { int keys %{$_[0]->users} || $_[0]->{n_users} || 0 }

sub TO_JSON {
  my $self = shift;
  return {frozen => $self->frozen, id => $self->id, name => $self->name, topic => $self->topic, users => $self->users};
}

sub _build_home    { }
sub _log_file      { $_[0]->home->rel_file($_[0]->id) }
sub _setting_keys  {qw( id )}
sub _settings_file { die "$_[0] cannot save settings" }

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2014, Jan Henning Thorsen

This program is free software, you can redistribute it and/or modify it under
the terms of the Artistic License version 2.0.

=head1 AUTHOR

Jan Henning Thorsen - C<jhthorsen@cpan.org>

=cut

1;